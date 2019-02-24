import React from 'react'
import BillList from '../../Pages/BillContainer/BillList'

const TrendingContainer = (props) => {
  return (
    <BillList 
      untrackBill={props.untrackBill.bind(this)} 
      addBillToTracking={props.addBillToTracking.bind(this)} 
      bills={props.bills} 
      trackedBills={props.trackedBills}
      logged={props.logged}
    />
  )
}

export default TrendingContainer