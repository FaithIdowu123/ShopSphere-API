const mongoose = require('mongoose');
const Product = require('./products'); // your Product model

const orderSchema = new mongoose.Schema({
  userId: {
    type: String
  },

  products: [
    {
      productId: {
        type: String,
        required: true
      },
      itemCount: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],

  totalAmount: {
    type: Number,
    min: 0,
    default: 0 // will be calculated automatically
  },

  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },

  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer'],
    required: true
  },

  orderAddress: {
    type: String,
    required: true,
    trim: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

}, { versionKey: false });

async function calculateTotal(products) {
  let total = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId).select('price');
    if (!product) throw new Error(`Product not found: ${item.productId}`);
    total += product.price * item.itemCount;
  }
  total = Number(total.toFixed(2));
  return total;
}

// Pre-save hook for new orders
orderSchema.pre('save', async function(next) {
  if (this.isModified('products') || this.isNew) {
    this.totalAmount = await calculateTotal(this.products);
  }
});

// Pre-update hook for findOneAndUpdate
orderSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();

  if (update.products) {
    const total = await calculateTotal(update.products);
    this.set({ totalAmount: total });
  }

});

module.exports = mongoose.model('Order', orderSchema, "Orders");
