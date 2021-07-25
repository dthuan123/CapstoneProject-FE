<template>
  <div>
    <admin-category-table
        v-bind:columnDefs="columnDefs"
        v-bind:pageSize="pageSize"
        v-bind:url="url"
        v-bind:headerOption="headerOption"
    >
    </admin-category-table>
  </div>
</template>

<script>
import AdminCategoryTable from './AdminCategoryTable.vue'
export default {
    components: { AdminCategoryTable },
    name: "AdminCategories",
    data() {
        return {
            columnDefs: null,
            url: null,
            pageSize: 10,
            headerOption: []
        }
    },
    beforeMount() {
        this.columnDefs = [
            {
                header: "STT",
                field: "id"
            },
            {
                header: "Tên thể loại",
                field: "name",
            },
        ];
        this.url = "admin/categories";
    }

}
</script>

<style>

</style>