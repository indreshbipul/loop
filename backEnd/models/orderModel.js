  orders:[{
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
        orderDate: {
            type: Date,
            default: Date.now
        },
        totalAmount: {
            type: Number,
        },
        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        }
    }],