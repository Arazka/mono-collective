import CartProvider from "./CartContext";

export default function AppProvider({ children }) {
    return <CartProvider>{children}</CartProvider>;
}
