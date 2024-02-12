import { Providers } from "../GlobalRefux/provider";
import "../globals.css";

export const metadata = {
    title: "Library App",
    description: "Generated by Naufal",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
