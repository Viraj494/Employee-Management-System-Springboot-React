import React from 'react';

const FooterComponent = () => {
    return (
        <footer className="footer bg-light text-center py-3">
            <span>Mobitel-Inoc | All Rights Reserved &copy; {new Date().getFullYear()}</span>
        </footer>
    );
}

export default FooterComponent;
