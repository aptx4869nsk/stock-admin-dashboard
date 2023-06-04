<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-button type="primary" :icon="Plus" @click="handleAdd">
          {{
          $t("message.common.add")
          }}
        </el-button>
        <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">
          <template #reference>
            <el-button type="danger" :icon="Delete">{{ $t("message.common.delBat") }}</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="layout-container-form-search">
        <el-input v-model="query.input" placeholder="Search with stock_symbol or stock_spell"></el-input>
        <el-button
          type="primary"
          :icon="Search"
          class="search-btn"
          @click="getTableData(true)"
        >Search</el-button>
      </div>
    </div>
    <div class="layout-container-table">
      <Table
        ref="table"
        :page="page"
        v-loading="loading"
        :showSelection="true"
        :data="tableData"
        @getTableData="getTableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="Id" align="center" width="80" />
        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="buy" label="昵称" align="center" />
        <el-table-column prop="change_percentage" label="角色" align="center" />
        <el-table-column
          :label="$t('message.common.handle')"
          align="center"
          fixed="right"
          width="200"
        >
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">
              {{
              $t("message.common.update")
              }}
            </el-button>
            <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger">{{ $t("message.common.del") }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
    </div>
  </div>
</template>
  
<script>
import Table from "@/components/table/index.vue";
import { getCnStocks } from "@/api/model/stocks";
import { reactive, ref } from "vue";
import { Plus, Delete, Search } from "@element-plus/icons-vue";
export default {
  components: {
    Table,
  },
  setup() {
    // 存储搜索用的数据
    const query = reactive({
      input: "",
    });
    const page = reactive({
      index: 1,
      size: 20,
      total: 0,
    });
    const loading = ref(true);
    const tableData = ref([]);
    const chooseData = ref([]);
    const handleSelectionChange = (val) => {
      chooseData.value = val;
    };

    const getTableData = (init) => {
      loading.value = true;
      if (init) {
        page.index = 1;
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        ...query,
      };
      getCnStocks(params)
        .then((res) => {
          let data = res.data.stocks;
          data.forEach((d) => {
            d.loading = false;
          });
          tableData.value = data;
          page.total = Number(res.data.meta.total);
        })
        .catch((error) => {
          tableData.value = [];
          page.index = 1;
          page.total = 0;

          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    getTableData(true);
    return {
      tableData,
      chooseData,
      loading,
      page,
      query,
      handleSelectionChange,
      getTableData,
      Plus,
      Delete,
      Search,
    };
  },
};
</script>
<style>
.el-input {
  width: 15vw;
}
</style>