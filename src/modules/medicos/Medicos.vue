<template>
  <h1 class="m-5">Médicos</h1>
  <Divider />
  <div class="container">
    <div class="table-container">
      <div class="actions">
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters.global.value" placeholder="Busqueda general" />
        </IconField>
        <div class="buttons">
          <Button
            label="Eliminar filtros"
            icon="pi pi-times"
            variant="text"
            severity="info"
            @click="deleteFilters()"
          />
          <Button label="Agregar" icon="pi pi-plus" />
        </div>
      </div>
      <DataTable
        :globalFilterFields="['name', 'especialidad', 'centroMedico']"
        :rows="5"
        :value="medic"
        filterDisplay="row"
        paginator
        tableStyle="min-width: 50rem"
        v-model:selection="selectedMedic"
        v-model:filters="filters"
        removableSort
      >
        <Column field="name" header="Nombre" :showFilterMenu="false" sortable >
          <template #filter>
            <InputText v-model="filters.name.value" placeholder="Buscar por nombre" />
          </template>
        </Column>
        <Column field="especialidad" header="Especialidad" :showFilterMenu="false" sortable>
          <template #filter>
            <InputText v-model="filters.especialidad.value" placeholder="Buscar por especialidad" />
          </template>
        </Column>
        <Column field="centroMedico" header="Centro Médico" :showFilterMenu="false" sortable>
          <template #filter>
            <Select
              :options="centrosMedicos"
              filter
              v-model="filters.centroMedico.value"
              placeholder="Buscar por centro medico"
              optionLabel="name"
              optionValue="name"
            />
          </template>
        </Column>
        <Column>
          <template #body>
            <Button icon="pi pi-pencil" severity="info" variant="text" />
            <Button icon="pi pi-trash" severity="danger" variant="text" />
          </template>
        </Column>
        <template #empty> No se encontraron médicos. </template>
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import { FilterMatchMode } from '@primevue/core/api';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { Select } from 'primevue';

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  especialidad: { value: null, matchMode: FilterMatchMode.CONTAINS },
  centroMedico: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const deleteFilters = () => {
  filters.value.global.value = null;
  filters.value.name.value = null;
  filters.value.especialidad.value = null;
  filters.value.centroMedico.value = null;
};

const selectedMedic = ref();
const medic = ref([
  { id: 1, name: 'Dr. Juan Pérez', especialidad: 'Cardiología', centroMedico: 'Centro Médico A' },
  { id: 2, name: 'Dra. María García', especialidad: 'Pediatría', centroMedico: 'Centro Médico B' },
  {
    id: 3,
    name: 'Dr. Carlos Sánchez',
    especialidad: 'Dermatología',
    centroMedico: 'Centro Médico C',
  },
  { id: 4, name: 'Dra. Laura López', especialidad: 'Neurología', centroMedico: 'Centro Médico D' },
  {
    id: 5,
    name: 'Dr. Andrés Torres',
    especialidad: 'Oftalmología',
    centroMedico: 'Centro Médico E',
  },
  { id: 6, name: 'Dra. Ana Ramírez', especialidad: 'Oncología', centroMedico: 'Centro Médico F' },
  {
    id: 7,
    name: 'Dr. Jorge Fernández',
    especialidad: 'Ginecología',
    centroMedico: 'Centro Médico G',
  },
  { id: 8, name: 'Dra. Paula Ruiz', especialidad: 'Psiquiatría', centroMedico: 'Centro Médico H' },
  {
    id: 9,
    name: 'Dr. Sebastián Castro',
    especialidad: 'Endocrinología',
    centroMedico: 'Centro Médico I',
  },
  {
    id: 10,
    name: 'Dra. Camila Vega',
    especialidad: 'Traumatología',
    centroMedico: 'Centro Médico J',
  },
  { id: 11, name: 'Dr. Martín Molina', especialidad: 'Urología', centroMedico: 'Centro Médico K' },
  {
    id: 12,
    name: 'Dra. Isabel Herrera',
    especialidad: 'Nefrología',
    centroMedico: 'Centro Médico L',
  },
  {
    id: 13,
    name: 'Dr. Nicolás Salazar',
    especialidad: 'Reumatología',
    centroMedico: 'Centro Médico M',
  },
  {
    id: 14,
    name: 'Dra. Fernanda Reyes',
    especialidad: 'Gastroenterología',
    centroMedico: 'Centro Médico N',
  },
  {
    id: 15,
    name: 'Dr. Tomás Cabrera',
    especialidad: 'Hematología',
    centroMedico: 'Centro Médico O',
  },
  {
    id: 16,
    name: 'Dra. Gabriela Paredes',
    especialidad: 'Infectología',
    centroMedico: 'Centro Médico P',
  },
  {
    id: 17,
    name: 'Dr. Felipe León',
    especialidad: 'Otorrinolaringología',
    centroMedico: 'Centro Médico Q',
  },
  {
    id: 18,
    name: 'Dra. Valeria Silva',
    especialidad: 'Alergología',
    centroMedico: 'Centro Médico R',
  },
  {
    id: 19,
    name: 'Dr. Ricardo Ríos',
    especialidad: 'Medicina Interna',
    centroMedico: 'Centro Médico S',
  },
  {
    id: 20,
    name: 'Dra. Andrea Zamora',
    especialidad: 'Cirugía General',
    centroMedico: 'Centro Médico T',
  },
]);

const centrosMedicos = ref(
  medic.value.map((med) => {
    return { name: med.centroMedico };
  }),
);
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  overflow: auto;
  width: 100%;
  height: 100%;

  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;

    .actions {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 1rem;

      .buttons {
        display: flex;
        gap: 1rem;
      }
    }

    .p-datatable-inline-filter {
      width: fit-content;

      .p-datatable-filter-element-container {
        flex: none;
        width: fit-content;
      }
    }
  }
}
</style>
