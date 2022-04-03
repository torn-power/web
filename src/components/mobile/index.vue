<template>
  <div class="mobile-wrap">
    <header>
      <img class="logo" src="/img/logo.png" alt="logo" srcset="" />
      <img
        class="line"
        src="/img/line.png"
        alt="line"
        srcset=""
        @click="drawerVisible = true"
      />
    </header>

    <section>
      <div class="title">共享数据</div>
      <div class="data-box">
        <div class="data-box-content">
          <div class="data-box-left">
            <span class="color-1" style="font-weight: 600">累计为用户提供</span>
            <span>&nbsp;带宽</span>
          </div>
          <div class="color-3">1,545,632,123</div>
        </div>
        <div class="data-box-content">
          <div class="data-box-left">
            <span class="color-1" style="font-weight: 600">累计为用户提供</span>
            <span>&nbsp;能量</span>
          </div>
          <div class="color-3">1,545,632,123</div>
        </div>
        <div class="data-box-content">
          <div class="data-box-left">
            <span class="color-1" style="font-weight: 600">累计为用户节省</span>
            <span>&nbsp;TRX</span>
          </div>
          <div class="color-3">1,545,632,123</div>
        </div>
      </div>
    </section>

    <section>
      <div class="title" style="font-size: 18px">推荐奖励</div>
      <div class="data-box" style="margin: 18px auto 58px auto">
        <div class="data-box-content">
          <div class="data-box-left">
            <img class="icon" src="/img/icon-1.png" alt="" />
            <span class="color-1">&emsp;钱包余额</span>
          </div>
          <div class="color-2">1,545,632,123</div>
        </div>
        <div class="data-box-content">
          <div class="data-box-left">
            <img class="icon" src="/img/icon-2.png" alt="" />
            <span class="color-1">&emsp;获得的奖励</span>
          </div>
          <div class="color-2">1,545,632,123</div>
        </div>
        <div class="data-box-content">
          <div class="data-box-left">
            <img class="icon" src="/img/icon-3.png" alt="" />
            <span class="color-1">&emsp;已邀请人数</span>
          </div>
          <div class="color-2">0</div>
        </div>

        <div class="line"></div>

        <div class="copy-text">复制您的推荐链接，邀请并获得海量奖励</div>

        <div class="copy-box">
          <div class="copy-url">https://www.figma.com/id=0%3A11111111111</div>
          <div class="copy-line"></div>
          <img class="copy-img" src="/img/copy.png" alt="" />
        </div>
      </div>
    </section>

    <section>
      <div class="title" style="font-size: 18px">资源共享</div>
      <div class="data-box data-form">
        <a-form name="formState">
          <a-form-item>
            <a-input placeholder="资源接收地址"></a-input>
          </a-form-item>
          <a-form-item>
            <a-space>
              <span class="color-1" style="font-size: 12px">资源类型：</span>
              <a-radio-group>
                <a-radio value="ENERGY" style="color: white; font-size: 12px">{{
                  $t("global.energy")
                }}</a-radio>
                <a-radio
                  value="BANDWIDTH"
                  style="color: white; font-size: 12px"
                  >{{ $t("global.bandwidth") }}</a-radio
                >
              </a-radio-group>
            </a-space>
          </a-form-item>
          <a-form-item>
            <a-input placeholder="资源数量"></a-input>
          </a-form-item>
          <a-form-item>
            <div style="display: flex">
              <a-input class="input-search" placeholder="单价"></a-input>
              <div class="block">sun/天</div>
            </div>
          </a-form-item>
          <a-form-item>
            <div class="form-tip">
              订单金额：<span class="form-tip-num">9.00</span><span> TRX</span>
            </div>
            <div class="form-tip-1">
              相比燃烧TRX获得资源节省：
              <span class="form-tip-num">75.00</span><span> TRX</span>
            </div>
          </a-form-item>
          <a-form-item>
            <a-button
              class="place-order-button"
              type="primary"
              shape="round"
              size="large"
              style="width: 100%"
              >下单</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </section>

    <section>
      <div class="title" style="font-size: 18px">我的订单</div>
      <div class="data-box">
        <a-select style="width: 100%">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
          <a-select-option value="3">3</a-select-option>
        </a-select>

        <div class="data-table">
          <div class="data-table-header">
            <div>订单信息</div>
            <div>订单信息</div>
            <div class="action">操作</div>
          </div>
          <div class="data-table-body">
            <div class="content" v-for="(v, i) in 10" :key="i">
              <div class="content-data">
                <div>价格/天： <span>500</span> <span>sun</span></div>
                <div>带宽： <span>1,2333</span></div>
              </div>
              <div class="content-data">
                <div>收入： <span>500</span> <span>sun</span></div>
                <div>冻结： <span>1,2333</span></div>
              </div>
              <div class="content-action">
                <a-button
                  class="sell-button"
                  type="primary"
                  shape="round"
                  size="small"
                  style="margin: 0 auto"
                  >出售</a-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <img class="logo" src="/img/logo.png" alt="logo" srcset="" />
    </footer>

    <a-drawer
      title="更多"
      placement="right"
      :closable="false"
      v-model:visible="drawerVisible"
    >
      <p>地址：</p>
      <a-space>
        <div class="actived">中文</div>
        /
        <div>En</div>
      </a-space>
    </a-drawer>
  </div>
</template>
<script setup>
import { ref } from "vue";

const drawerVisible = ref(false);
</script>

<style lang="less" scoped>
.color-1 {
  color: rgba(255, 255, 255, 0.65);
}
.color-2 {
  color: white;
  font-size: 18px;
}
.color-3 {
  color: #ffcc17;
  font-size: 15px;
}

.mobile-wrap {
  box-sizing: border-box;
  width: 100vw;
  min-height: 200vh;
  background-image: url("/img/mobile_bg.png");
  background-size: cover;
  background-repeat: no-repeat;

  header {
    position: sticky;
    top: 0;
    left: 0;
    height: calc(100px / 2);
    padding: 0 calc(12.5% / 2);
    color: white;
    font-size: 16px;
    display: flex;
    z-index: 2;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    .logo {
      width: calc(158px / 2);
    }
    .line {
      width: 32px;
      cursor: pointer;
    }
  }

  section {
    margin: 32px auto;
    .title {
      color: white;
      text-align: center;
      font-size: 28px;
    }
    .data-box {
      width: 320px;
      padding: 16px 18px;
      background: rgba(36, 50, 100, 0.6);
      backdrop-filter: blur(3px);
      margin: 32px auto 58px auto;
      border: 0.5px solid;
      border-image-slice: 1;
      color: white;
      font-size: 12px;
      border-image-source: linear-gradient(
        92.7deg,
        #a310fe 10.86%,
        #19ee48 101.11%
      );

      .data-box-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 9px 0;
        .icon {
          width: 26px;
        }
      }

      .line {
        width: 100%;
        height: 0;
        margin: 12px auto;
        border: 0.2px solid rgba(255, 255, 255, 0.15);
      }
      .copy-text {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.65);
        margin: 12px 0px;
      }

      .copy-box {
        width: 100%;
        height: 32px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 2px;
        display: flex;
        align-items: center;
        padding: 2px 6px;
        .copy-url {
          width: 80%;
          font-weight: 400;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.65);
          flex: none;
          order: 0;
          flex-grow: 1;
          overflow: hidden;
        }
        .copy-line {
          width: 6px;
          height: 0px;
          border: 0.5px solid #eff0f1;
          transform: rotate(90deg);
          flex: none;
          order: 1;
          flex-grow: 0;
          margin: 0px 10px;
        }
        .copy-img {
          width: 20px;
          order: 1;
          flex-grow: 0;
        }
      }

      .data-table {
        margin: 6px auto;
        &-header {
          height: 40px;
          background: #192745;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.65);
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 35%;
            padding-left: 10px;
          }
          .action {
            // text-align: center;
            padding-left: 0;
          }
        }
        &-body {
          height: 200px;
          overflow-y: auto;
          .content {
            height: 48px;
            background: #2e3b55;
            display: flex;
            align-items: center;
            font-size: 10px;
            padding: 8px;

            &-data > div {
              width: 100%;
              display: flex;
              align-items: center;
              font-size: 10px;
              transform: scale(0.85);
            }
            &-action {
              width: 30%;
              text-align: right;
              .sell-button {
                font-size: 10px;
                box-shadow: 0px 3px 16px rgba(255, 220, 98, 0.5);
              }
            }
          }
        }
      }
    }
    .data-form {
      margin: 18px auto 58px auto;
      .form-tip {
        font-size: 12px;
        color: white;
        span {
          color: #ffcc17;
        }
        .form-tip-num {
          font-size: 20px;
          font-weight: 600;
        }
        &-1 {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.85);
          span {
            color: white;
          }
          .form-tip-num {
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
      .place-order-button {
        background: linear-gradient(90.87deg, #f18a2b -41.78%, #ffef5e 100%);
        box-shadow: 0px 3px 12px rgba(255, 220, 98, 0.5);
      }
    }
  }

  footer {
    height: 39px;
    background: rgba(18, 27, 36, 0.5);
    backdrop-filter: blur(17px);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: calc(158px / 2);
    }
  }

  .ant-input {
    background-color: #2e3057;
    border: none;
    height: 35px;
    border: 0.5px solid rgba(53, 201, 255, 0.2);
    color: rgba(255, 255, 255, 0.65);
    &::placeholder {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.65);
    }
  }

  .block {
    width: 60px;
    height: 35px;
    background: #0e1039;
    color: rgba(255, 255, 255, 0.85);
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 2px 2px 0px;
  }
}
</style>

<style>
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  background-color: #2e3057 !important;
  border: none;
  color: white;
}
.ant-select-dropdown {
  background-color: #2e3057;
  color: white;
}
.ant-select-item-option {
  color: white;
}
.ant-select-item-option-active {
  background-color: #1d1e3b !important;
}
.ant-drawer-wrapper-body,
.ant-drawer-header,
.ant-drawer-title,
.ant-drawer-body {
  background-color: #2e3057 !important;
  border: none;
  color: rgba(255, 255, 255, 0.65);
}

.actived {
  color: rgb(82, 82, 133);
}
</style>
