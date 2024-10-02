<script lang="ts" setup>
    import MainLayout from "@/ts/layouts/MainLayout.vue"
</script>

<template>
    <MainLayout>
        <template v-slot:main>
            <table class="flex bg-gray-200 w-[1200px] h-[590px] rounded-xl">
                <thead class="border-b-[1px] border-b-black h-[60px] w-full">
                    <div class="flex justify-around items-center">
                        <h1>Proyectos</h1>
                        <button class="bg-green-500 text-white rounded-md p-2">
                            Nuevo registro
                            <v-icon name="co-plus" scale="1.2" />
                        </button>
                    </div>
                    <tr>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </template>
    </MainLayout>
</template>

<style scoped></style>
