import React from "react";

import OrderTabs from "../containers/Orders/OrderTabs";
import OrderTableContainer from "../containers/Orders/OrderTableContainer";

const OrdersPage = () => {
    return (
        <div>
            <OrderTabs />
            <OrderTableContainer />

        </div>
    );
};

export default OrdersPage;
