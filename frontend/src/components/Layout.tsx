import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <div style={{ padding: 20 }}>{children}</div>
        </div>
    );
};

export default Layout;