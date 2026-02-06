import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyCart from "@/components/cart/EmptyCartComponent";
import { LocaleProvider } from "@/contexts/LocaleContext";

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider>{ui}</LocaleProvider>);
}

describe("EmptyCart", () => {
  it("renders empty cart message", () => {
    renderWithLocale(<EmptyCart />);
    expect(screen.getByText("Ваша корзина порожня")).toBeInTheDocument();
  });

  it("renders link to catalog", () => {
    renderWithLocale(<EmptyCart />);
    const links = screen.getAllByRole("link", { name: /перейти до каталогу/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/products");
  });
});
