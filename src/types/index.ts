import { Order, OrderProducts, QProduct } from "@prisma/client";

export type OrderItem = Pick<QProduct, 'id' | 'name' | 'price'> & {
    quantity: number,
    subtotal: number
}

export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: QProduct
    })[]
}