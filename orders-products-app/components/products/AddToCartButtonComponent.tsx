"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import type { CartItem } from "@/types/cart";
import { useLocale } from "@/contexts/LocaleContext";
import AlertModal from "@/components/common/AlertModalComponent";

interface AddToCartButtonProps {
  product: {
    id: number;
    title: string;
    price: { value: number; symbol: string }[];
    type: string;
    stock?: number;
    guarantee?: { start: string; end: string };
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { t } = useLocale();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    setIsAdding(true);

    const usdPrice =
      product.price.find((p) => p.symbol === "USD")?.value ?? 0;
    const uahPrice =
      product.price.find((p) => p.symbol === "UAH")?.value ?? 0;

    const item: CartItem = {
      id: product.id,
      title: product.title,
      price: usdPrice || product.price[0].value,
      currency: (usdPrice ? "USD" : product.price[0].symbol) as "USD" | "UAH",
      priceUSD: usdPrice || (product.price[0].symbol === "USD" ? product.price[0].value : undefined),
      priceUAH: uahPrice || product.price.find((p) => p.symbol === "UAH")?.value,
      type: product.type,
      quantity,
      maxQuantity: product.stock ?? 100,
      guarantee: product.guarantee,
    };

    dispatch(addItem(item));

    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
      setIsModalOpen(true);
    }, 500);
  };

  return (
    <div className="add-to-cart">
      <div className="d-flex align-items-center justify-content-center mb-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
          style={{ width: "30px" }}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          max={product.stock || 100}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="form-control text-center mx-2"
          style={{ width: "60px" }}
        />
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() =>
            setQuantity((prev) => Math.min(product.stock || 100, prev + 1))
          }
          disabled={quantity >= (product.stock || 100)}
          style={{ width: "30px" }}
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`btn w-100 ${isAdding ? "disabled" : ""}`}
        style={{
          fontSize: "0.875rem",
          padding: "0.375rem 0.75rem",
          backgroundColor: "#10b981",
          borderColor: "#10b981",
          color: "#ffffff",
        }}
      >
        {isAdding ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            {t("products.adding")}
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart-plus me-2"
              viewBox="0 0 16 16"
            >
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            {t("products.addToCart")}
          </>
        )}
      </button>
    </div>
  );
}
