"use client"

import { useStore } from "@/src/store"
import { QProduct } from "@prisma/client"

type AddProductButtonProps = {
    product: QProduct
}
export default function AddProductButton({ product }: AddProductButtonProps) {

    const addToOrder = useStore((state) => state.addToOrder)

    return (
        <>
            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                onClick={() => addToOrder(product)}
            >Agregar</button>
        </>
    )
}
