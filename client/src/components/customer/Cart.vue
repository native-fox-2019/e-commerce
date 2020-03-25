<template>
  <div id="cartBox">
    <div id="tableDetail">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="totalSummary">
      <div class="summaryCol">
        <h6>ADD VOUCHER</h6>
        <form id="inputVoucher">
          <input type="text" />
          <button id="btnAdd">ADD</button>
        </form>
      </div>
      <div id="summaryGrand">
        <h6>SUMMARY</h6>
        <div class="totalSum">
          <p>Total :</p>
          <p>Rp. 1.000</p>
        </div>
        <div class="totalSum">
          <p>Grand Total :</p>
          <p>Rp. 1.000</p>
        </div>
        <div id="btnCheckOut">CHECKOUT</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Cart"
};
</script>

<style scoped>
#cartBox {
  display: flex;
  padding-top: 2em;
}
#tableDetail {
  width: 65%;
}
table {
  color: #707070;
}
th {
  font-size: 15px;
  letter-spacing: 1px;
}
#totalSummary {
  width: 35%;
  display: flex;
  flex-direction: column;
}
.summaryCol {
  border: 1px solid #707070;
  flex-direction: column;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100px; */
  padding-top: 1em;
  padding-bottom: 1em;
}
.summaryCol h6 {
  letter-spacing: 3px;
}
#inputVoucher {
  margin-top: 2px;
  display: flex;
  justify-content: center;
}
#btnAdd {
  background-color: #707070;
  color: #fff;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  width: 80px;
  justify-content: center;
}
#btnAdd:hover {
  /* border: 1px solid #707070; */
  background-color: #fff;
  color: #707070;
}
input {
  outline: none;
  color: #707070;
}

#summaryGrand {
  display: flex;
  flex-direction: column;
  border: 1px solid #707070;
  margin-top: 1em;
  justify-content: center;
  align-items: center;
  padding-top: 1em;
}
.totalSum {
  border-bottom: 1px solid #707070;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 1em;
  margin-bottom: 1em;
}
.totalSum p {
  font-size: 15px;
}
#btnCheckOut {
  width: 100%;
  background-color: #707070;
  color: #fff;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 35px;
  cursor: pointer;
}
#btnCheckOut:hover {
  border-top: 1px solid #707070;
  background-color: #fff;
  color: #707070;
}
</style>