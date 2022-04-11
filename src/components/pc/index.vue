<template>
  <div class="pc-wrap">
    <div class="header">导航</div>
    <div class="content">
      <!-- 共享数据 -->
      <div class="share-data-wrap">
        <div class="title">共享数据</div>
        <div class="share-data-content-wrap">
          <div class="content-item-wrap">
            <div class="num">1,545,632,123</div>
            <div class="name">累计为用户提供<span class="sign-name">&nbsp;带宽</span></div>
          </div>
          <div class="content-item-wrap">
            <div class="num">1,545,632 K</div>
            <div class="name">累计为用户提供<span class="sign-name">&nbsp;能量</span></div>
          </div>
          <div class="content-item-wrap">
            <div class="num">1,545,632,123</div>
            <div class="name">累计为用户节省<span class="sign-name">&nbsp;TRX</span></div>
          </div>
        </div>
      </div>
      <!-- 推荐奖励 -->
      <div class="recommend-reward">
        <div class="title">推荐奖励</div>
        <div class="recommend-reward-wrap">
          <div class="reward-detail-content-wrap">
            <div class="reward-detail-item-wrap">
              <img class="reward-icon" src="/img/icon-1.png" alt="" />
              <div class="reward-detail-wrap">
                <div class="reward-name">
                    钱包余额
                </div>
                <div class="reward-num">
                  0.00
                </div>
              </div>
            </div>
            <div class="reward-detail-item-wrap">
              <img class="reward-icon" src="/img/icon-2.png" alt="" />
              <div class="reward-detail-wrap">
                <div class="reward-name">
                    获得的奖励
                </div>
                <div class="reward-num">
                  0.00
                </div>
              </div>
            </div>
            <div class="reward-detail-item-wrap">
              <img class="reward-icon" src="/img/icon-3.png" alt="" />
              <div class="reward-detail-wrap">
                <div class="reward-name">
                    已邀请人数
                </div>
                <div class="reward-num">
                  0.00
                </div>
              </div>
            </div>
          </div>
          <div class="recommend-url-wrap">
            <div class="recommend-url-tips">复制您的推荐链接，邀请并获得海量奖励。</div>
            <div class="recommend-url-content-wrap">
              <div class="url-content-wrap">
                https://www.figma.com/id=0%3A1
              </div>
              <div class="copy-url-line"></div>              
              <img class="copy-img" src="/img/copy.png" alt="" />
              <div class="copy-btn">复制到剪贴板</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 资源租赁 -->
      <div class="resource-lease-wrap">
        <div class="title">资源租赁</div>
        <div class="resource-lease-content-wrap">
          <div class="resource-lease-content-form">
            <a-form name="formState">
                <a-form-item>
                  <a-row>
                    <a-col :span="5">
                      <div class="color-1 font-24 form-item-name">资源接收地址</div>
                    </a-col>
                    <a-col :span="19">
                      <a-input placeholder="资源接收地址"></a-input>
                    </a-col>
                  </a-row>
                </a-form-item>
                <a-form-item>
                  <a-row>
                    <a-col :span="5">
                      <div class="color-1 font-24 form-item-name">资源类型</div>
                    </a-col>
                    <a-col :span="19">
                      <div class="form-item-value">
                        <a-radio-group>
                          <a-radio value="ENERGY" class="font-24" style="color: white">{{
                            $t("global.energy")
                          }}</a-radio>
                          <a-radio
                            value="BANDWIDTH"
                            class="font-24"
                            style="color: white"
                            >{{ $t("global.bandwidth") }}</a-radio
                          >
                        </a-radio-group>
                      </div>
                    </a-col>
                  </a-row>
                </a-form-item>
                <a-form-item>
                  <a-row>
                    <a-col :span="5">
                      <div class="color-1 font-24 form-item-name">资源数量</div>
                    </a-col>
                    <a-col :span="19">
                      <a-input-number
                        v-if="1"
                        :placeholder="$t('tip.pledgeEnergy', { amount: 300 })"
                        :precision="0"
                      />
                      <a-input-number
                        v-else
                        :placeholder="$t('tip.pledegBandWidth', { amount: 500 })"
                        :precision="0"
                      />
                    </a-col>
                  </a-row>
                </a-form-item>
                <a-form-item>
                  <a-row>
                    <a-col :span="5">
                      <div class="color-1 font-24 form-item-name">单价(sun) / 天</div>
                    </a-col>
                    <a-col :span="19">
                      <a-input-number
                        :min="0"
                        class="input-search"
                        placeholder="单价"
                      ></a-input-number>
                    </a-col>
                  </a-row>
                </a-form-item>
                <div>
                  <a-row>
                    <a-col :span="5">
                      <div class="color-1 font-24 form-item-name">订单金额</div>
                    </a-col>
                    <a-col :span="19">
                      <div class="form-item-value">
                        <span style="font-style: normal;font-weight: 600;font-size: 24px;line-height: 24px;color: #FFCC17;margin-right:4px;">196.00</span>
                        <span style="font-style: normal;font-weight: 400;font-size: 14px;line-height: 22px;color: #FFCC17;margin-right:12px;">TRX</span>
                        <span style="font-style: normal;font-weight: 400;font-size: 14px;line-height: 22px;color: #FFCC17;margin-right:4px;">相比燃烧TRX获得资源节省</span>
                        <span style="font-style: normal;font-weight: 600;font-size: 18px;line-height: 24px;color: #FFFFFF;margin-right:4px;">196.00</span>
                        <span style="font-style: normal;font-weight: 400;font-size: 14px;line-height: 22px;color: #FFFFFF;">TRX</span>
                      </div>
                    </a-col>
                  </a-row>
                </div>
            </a-form>
          </div>
          <a-button
            class="place-order-button"
            type="primary"
            shape="round"
            size="large"
          >下单</a-button>
        </div>
      </div>
      <!-- 当前订单 -->
      <div class="current-order-wrap">
        <div class="title">当前订单</div>
        <div class="current-order-content-wrap">
          <div style="width:100%">
            <a-select style="width: 288px">
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
              <a-select-option value="3">3</a-select-option>
            </a-select>
          </div>
          <div style="width:100%">
            <div class="order-table-header-wrap">
              <a-row>
                <a-col :span="9">
                  <div class="order-table-header-item">订单信息</div>
                </a-col>
                <a-col :span="9">
                  <div class="order-table-header-item">卖家收入</div>
                </a-col>
                <a-col :span="6">
                  <div class="order-table-header-item">操作</div>
                </a-col>
              </a-row>
            </div>
            <div class="order-table-body-wrap">
              <div class="order-table-body-row" v-for="(v, i) in 10" :key="i">
                <a-row>
                  <a-col :span="9">
                    <div class="order-table-body-item">
                      <div class="body-item-line">
                        <span class="line-name">价格/天：</span>
                        <span class="line-num">500</span>
                        <span class="line-unit">sun</span>
                      </div>
                      <div class="body-item-line">
                        <span class="line-name">带宽：</span>
                        <span class="line-num">12,323</span>
                      </div>
                    </div>
                  </a-col>
                  <a-col :span="9">
                    <div class="order-table-body-item">
                      <div class="body-item-line">
                        <span class="line-name">价格/天：</span>
                        <span class="line-num">500</span>
                        <span class="line-unit">sun</span>
                      </div>
                      <div class="body-item-line">
                        <span class="line-name">带宽：</span>
                        <span class="line-num">12,323</span>
                      </div>
                    </div>
                  </a-col>
                  <a-col :span="6">
                    <div class="order-table-body-item operation-btn-wrap">
                      <a-button
                        class="sell-button"
                        type="primary"
                        shape="round"
                        size="small"
                        style="margin: 0 auto"
                      >出售</a-button>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style lang="less" scoped>
@import "index.less";

</style>
