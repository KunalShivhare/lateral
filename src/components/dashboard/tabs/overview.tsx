import React from "react";
import { PaymentPlan } from "../PaymentPlan";
import { TaskList } from "../TaskList";
import { LinkedRecords } from "../LinkedRecords";
import { OpenInvoices } from "../OpenInvoices";
import { SettlementOffer } from "../SettlementOffer";

export default function overview() {
  return (
    <div>
      <TaskList />
      <PaymentPlan />
      <LinkedRecords />
      <OpenInvoices />
      <SettlementOffer />
    </div>
  );
}
