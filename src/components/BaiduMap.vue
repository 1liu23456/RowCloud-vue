<template>
    <div>
        <FormItem label="活动地址：" prop="address">
            <Row style="margin-bottom: 10px;">
                <Col span="16"><div id="allmap"></div></Col>
                <Col span="8">
                    <div class="mapsearch">
                        <!-- 搜索框 -->
                        <Input v-model="mapsearch" placeholder="搜索">
                            <Button type="primary" @click="map()" slot="append" icon="ios-search"></Button>
                        </Input>
                        <!-- 搜索结果展示列表 -->
                        <div id="r-result"></div>
                    </div>
                </Col>
            </Row>
            <Row>
                <!-- 地址、经纬度 -->
                <Col span="16"><Input v-model="formData.address"><span slot="prepend">地址：</span></Input></Col>
                <Col span="4"><Input v-model="formData.lng" disabled><span slot="prepend">经度：</span></Input></Col>
                <Col span="4"><Input v-model="formData.lat" disabled><span slot="prepend">纬度：</span></Input></Col>
            </Row>
        </FormItem>
    </div>
</template>