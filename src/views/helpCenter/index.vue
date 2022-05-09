<template>
  <section>
    <div class="data-box">
      <h1>{{ $t("global.helpCenter") }}</h1>
      <div>
        <h2>{{ $t("global.engeryAndBandWidth") }}</h2>
        <p>
          {{ $t("global.engeryAndBandWidthP1") }}
        </p>
        <h2>{{ $t("global.basicOperation") }}</h2>
        <p>
          ·{{ $t("global.placeOrder") }} <br />
          {{ $t("global.placeOrderTips") }}<br />
          ·{{ $t("global.unitPrice") }}<br />
          {{ $t("global.unitPriceTips") }}<br />
          ·{{ $t("global.cancelOrder") }}<br />
          {{ $t("global.cancelOrderTips") }}<br />
          ·{{ $t("global.sell") }}<br />
          {{ $t("global.sellTips") }}<br />
        </p>
        <h2>{{ $t("global.security") }}</h2>
        <p>
          {{ $t("global.securityTips1") }}<br />
          {{ $t("global.securityTips2") }}<br />
        </p>
        <div>{{ $t("global.teamName") }}</div>
      </div>
    </div>
  </section>
</template>
