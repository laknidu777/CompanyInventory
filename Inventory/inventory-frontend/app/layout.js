export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <nav>
                    <h1>Inventory System</h1>
                </nav>
                {children}
            </body>
        </html>
    );
}