import React from 'react'
import BillItem from '../BillContainer/BillItem'

const BillList = (props) => {
    // MAP OVER DATA AND MAKE BILL ITEMS
    const billList = props.bills.map((bill, i) => {
        let isTracked = false;
        let imgSrc = "/images/unclicked.gif";
        for (let i = 0; i < props.trackedBills.length; i++) {
            if (props.trackedBills[i].bill_id == bill.bill_id) {
                isTracked = true;
                imgSrc = "/images/clicked.gif";
            }
        }
        return (
            <li key={i} className='bills'>
                <BillItem
                    imgSrc={imgSrc}
                    trackedStatus={isTracked}
                    untrackBill={props.untrackBill.bind(this)}
                    addBillToTracking={props.addBillToTracking.bind(this)}
                    billInfo={bill}
                    logged={props.logged}
                />
            </li>
        )
    })

    return (
        <ul style={{ "listStyleType": "none", "padding": "0" }}>
            {billList}
        </ul>
    )
}

export default BillList
