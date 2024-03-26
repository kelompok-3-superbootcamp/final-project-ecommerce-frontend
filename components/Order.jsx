import React from "react"
import { Card } from "antd"
import { Button } from "flowbite-react"
const { Meta } = Card

const Order = () => (
  <>
  <Card className="m-auto w-2/3">
    <Meta title="Europe Street beat" description="www.instagram.com" />
    <Button type="primary" className="m-auto">Checkout</Button>
  </Card>
  </>
)
export default Order
