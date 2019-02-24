import React from 'react'
import BillList from '../BillContainer/BillList'

const BillContainer = (props) => {
    return (
      <div>
        <BillList 
          addBillToTracking={props.addBillToTracking.bind(this)} 
          untrackBill={props.untrackBill.bind(this)} 
          bills={props.bills} 
          trackedBills={props.trackedBills}
          logged={props.logged}
        />
      </div>
    )
}

export default BillContainer