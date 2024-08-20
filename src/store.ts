import { create } from "zustand";
import { OrderItem } from "./types";
import { QProduct } from "@prisma/client";

interface Store {
    order: OrderItem[]
    addToOrder: (product: QProduct) => void
    increaseQuantity: (id: QProduct['id']) => void
    decreaseQuantity: (id: QProduct['id']) => void
    removeItem: (id: QProduct['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const { categoryId, image, ...data } = product
        let items: OrderItem[] = []
        if (get().order.find(item => item.id === product.id)) {
            items = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price
            } : item)
        } else {
            items = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        set((state) => ({
            order: items
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price
            } : item)
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: (item.quantity - 1) * item.price,
        } : item)
        set((state) => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))