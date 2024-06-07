<template>
  <h1 v-if="isLoading">Loading...</h1>
  <main v-else>
    <section class="charts">
      <h1 class="charts__title mt-[10vw] mb-2.5 hello__title"> <span class="hello">Hello</span> {{ userName }}!</h1>
      <p class="charts__hd">I’ts looking like a slow day.</p>
      <div class="orders__wrapper flex justify-between mt-20">
        <chartRectaling
            class="orders__charts"
            iconName="fluent-mdl2:completed"
            iconColor="black"
            iconSize="37px"
            description="Complete"
            :count="orderLength"
        />
        <chartRectaling
            class="orders__charts"
            iconName="solar:tag-price-outline"
            iconColor="black"
            iconSize="40px"
            description="Total Price"
            :count="totalOrderPrice"
        />
        <chartRectaling
            class="orders__charts"
            iconName="ant-design:comment-outlined"
            iconColor="black"
            iconSize="40px"
            description="Comment"
            :count="commentCount"
        />
        <chartRectaling
            class="orders__charts"
            iconName="material-symbols:business-center-outline"
            iconColor="black"
            iconSize="40px"
            description="Company"
            :count="companyCount"
        />
      </div>
      <div class="mt-32 charts">
        <Bar :data="chartData" :options="chartOptions"/>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import {useQuery} from "@tanstack/vue-query";
import {
  COLLECTION_COMMENTS,
  COLLECTION_CUSTOMERS,
  COLLECTION_DEALS,
  DB_ID,
  NUXT_PROD_ID
} from "~/app.constants";
import { Client, Account } from "appwrite";
import {useKanbanQuery} from "~/components/kanban/useKanbanQuery";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
import ChartRectaling from "~/components/charts/chartRectaling.vue";
import dayjs from "dayjs";
const {data} = useKanbanQuery()

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

useSeoMeta({
  title: 'Charts | CRM system'
})

// График
const chartData = ref({})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})

// Тут мы получаем данные о пользователе
const userName = ref<string | null>(null);

const client = new Client();
const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(NUXT_PROD_ID)
;

const promise = account.get();

promise.then(
    (response) => {
      userName.value = response.name;
    },
    (error) => {
      console.log(error);
    }
);

// Тут получаем данные о заказах
const orders = ref(null);
const isLoading = ref(false);

const fetchOrders = async () => {
  isLoading.value = true;
  try {
    const allOrders = await DB.listDocuments(DB_ID, COLLECTION_DEALS);
    const completeOrders = allOrders.documents
        .filter((order) => order.status === 'complete')
        .map((order) => ({
          name: order.name,
          price: order.price,
          status: order.status,
          createdAt: dayjs(order.$createdAt).format('DD.MM.YY'),
        }));
    orders.value = { documents: completeOrders };

    // Подготовка данных для графика
    const labels = completeOrders.map(order => order.createdAt); // Даты для оси X
    const data = completeOrders.map(order => order.price); // Цены для отображения

    // Обновление данных графика
    chartData.value = {
      labels,
      datasets: [
        {
          label: 'Order Prices',
          backgroundColor: '#ffffff',
          data,
        },
      ],
    };

    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching orders:", error);
    isLoading.value = false;
  }
};

fetchOrders();

const {data: comments} = useQuery({
  queryKey: ['comments'],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_COMMENTS),
})
const {data: company} = useQuery({
  queryKey: ['company'],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
})

const calculateTotalOrderPrice = (orders) => {
  return orders?.documents.reduce((acc, order) => acc + order.price, 0) || 0;
};

// Используйте реактивные ссылки для хранения значений
let orderLength = ref<number | null>(null);
let totalOrderPrice = ref<number | null>(null);
let commentCount = ref<number | null>(null);
let companyCount = ref<number | null>(null);

// Слушайте изменения в orders и обновляйте соответствующие значения
watch(orders, (newOrders) => {
  orderLength.value = newOrders?.documents.length || null;
  totalOrderPrice.value = calculateTotalOrderPrice(newOrders);
});

// Слушайте изменения в comments и обновляйте соответствующее значение
watchEffect(() => {
  if (comments.value && comments.value.total) {
    commentCount.value = comments.value.total;
  }
});

// Слушайте изменения в company и обновляйте соответствующее значение
watchEffect(() => {
  if (company.value && company.value.total) {
    companyCount.value = company.value.total;
  }
});
</script>

<style scoped lang="scss">
.charts {
  padding: 0 15px;
  &__title {
    color: #5579ff;
    font-size: min(48px, 8vw);
    font-style: normal;
    font-weight: 600;
  }
}
.hello__title{
  font-size: min(48px, 8vw);
}
.hello {
  color: #6D7580;
  font-size: min(48px, 8vw);
  font-style: normal;
  font-weight: 600;
}
.charts__hd{
  color: #a4a4a4;
  font-size: min(24px, 4vw);
  font-style: normal;
  font-weight: 400;
  line-height: 154.5%;
}
.orders__wrapper{
  display: flex;
  justify-content: space-between;
}
.orders__charts{
  max-width: 300px;
}

@media (max-width: 1604px){
  .orders__charts{
    margin-bottom: 30px;
    align-items: center;
    justify-content: center;
  }
  .orders__wrapper{
    flex-wrap: wrap;
  }
}

@media (max-width: 478px){
  .charts{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

</style>
