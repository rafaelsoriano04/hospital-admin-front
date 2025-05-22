<template>
    <h1 class="m-5">Control de Usuarios</h1>
    <Divider />
    <Toast />
    <div class="container">
        <div class="table-container">
            <div class="actions">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters.global.value" placeholder="Búsqueda general" />
                </IconField>
                <div class="buttons">
                    <Button label="Eliminar filtros" icon="pi pi-times" variant="text" severity="info" @click="deleteFilters()" />
                    <Button label="Agregar" icon="pi pi-plus" @click="() => openModal()" />
                </div>
            </div>

            <DataTable :value="users" v-model:filters="filters" v-model:selection="selectedUser" :rows="5" paginator
                removableSort tableStyle="min-width: 50rem">
                <Column field="username" header="Usuario" :showFilterMenu="false" sortable />
                <Column field="role" header="Rol" :showFilterMenu="false" sortable />
                <Column header="Centro" :showFilterMenu="false" sortable>
                    <template #body="slotProps">
                        <span>{{ getCentroNombre(slotProps.data.centro) }}</span>
                    </template>
                </Column>

                <Column header="Acciones">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" severity="info" variant="text" @click="() => openModal(slotProps.data)" />
                        <Button icon="pi pi-trash" severity="danger" variant="text" 
                                @click="() => openDeleteModal(slotProps.data)" />
                    </template>
                </Column>
                <template #empty>No se encontraron usuarios.</template>
            </DataTable>
        </div>
    </div>

    <!-- Modal para editar o crear usuario -->
    <Dialog :header="isEditing ? 'Editar Usuario' : 'Crear Usuario'" v-model:visible="modalVisible" :modal="true" :closable="false"
    :dismissable-mask="true" :style="{ width: '37vw' }">
    <div class="inputs">
        <div class="username-password-container">
            <InputText 
                v-model="currentUser.username" 
                placeholder="Nombre de usuario" 
            />
            <Password 
                v-model="currentUser.password" 
                placeholder="Password" 
                toggleMask 
                :feedback="false" 
            />
        </div>

        <Dropdown 
            v-model="currentUser.role" 
            :options="roles" 
            optionLabel="label" 
            optionValue="value"
            placeholder="Seleccionar rol"
        />

        <Dropdown 
        v-if="currentUser.role === 'general'" 
        v-model="currentUser.centro" 
        :options="centros" 
        optionLabel="label" 
        optionValue="value" 
        placeholder="Seleccionar centro médico"
        :class="{'input-error': !currentUser.centro}" 
        />
       
        <span v-if="!currentUser.centro && currentUser.role === 'general'" class="error-message">
        El centro médico es requerido *
        </span>
    </div>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" @click="closeModal" />
      <Button label="Guardar" icon="pi pi-check" @click="saveUser" />
    </template>
</Dialog>

<!-- Modal para confirmar la eliminación -->
<Dialog
    header="Confirmar Eliminación"
    v-model:visible="deleteModalVisible"
    :modal="true"
    :closable="false"
    :dismissable-mask="true"
    :style="{ width: '37vw' }"
  >
    <p>¿Estás seguro de que deseas eliminar al usuario {{ userToDelete?.username }}?</p>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" @click="closeDeleteModal" />
      <Button label="Eliminar" icon="pi pi-trash" severity="danger" @click="deleteUser" />
    </template>
</Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import { FilterMatchMode } from '@primevue/core/api';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import Password from 'primevue/password';
import { useAppStore } from '@/stores/app-store';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const store = useAppStore();
const apiUrl = store.apiUrl;

const deleteModalVisible = ref(false);
const userToDelete = ref<{ id: number | null; username: string } | null>(null);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const users = ref([]);
const selectedUser = ref();
const modalVisible = ref(false);
const isEditing = ref(false);
const toast = useToast();

const newUser = ref({
    id: '', 
    username: '',
    password: '',
    role: 'general',
    centro:0
});
const centros = ref([   
    { label: 'Centro Médico Guayaquil', value: 2 },
    { label: 'Centro Médico Cuenca', value: 3 },
    {label:'Centro Medico Latacunga',value:4}
 
    
]);

const editingUser = ref({
  id: '',
  username: '',
  password: '',
  role: '',
});

const currentUser = computed({
  get: () => (isEditing.value ? editingUser.value : newUser.value),
  set: (val) => {
    if (isEditing.value) {
      editingUser.value = val;
    } else {
      newUser.value = val;
    }
  },
});

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'General', value: 'general' },
];

const deleteFilters = () => {
  filters.value.global.value = null;
};

const getUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/auth/users`);
        users.value = response.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener usuarios', life: 3000 });
        console.error('Error al obtener usuarios:', error);
    }
};

const openDeleteModal = (user: { id: number; username: string }) => {
  userToDelete.value = user ;
  deleteModalVisible.value = true;
};

const closeDeleteModal = () => {
  deleteModalVisible.value = false;
  userToDelete.value = null;
};

const openModal = (user?: any) => {
  if (user) {
    editingUser.value = {
      id: user.id,
      username: user.username,
      password: '',
      role: user.role,
    };
    isEditing.value = true;
  } else {
    isEditing.value = false;
  }
  modalVisible.value = true;
};

const closeModal = () => {
    modalVisible.value = false;
    newUser.value = { id: '', username: '', password: '', role: 'general',centro:0 };
    editingUser.value = { id: '', username: '', password: '', role: '',centro:0 };
};

const saveUser = async () => {
    try {
        const current = currentUser.value;
        
        if (!current.username || (!isEditing.value && !current.password)) {
            toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'El nombre de usuario y la contraseña son requeridos', life: 3000 });
            return;
        }
         if (current.role === 'admin') {
            current.centro = 1;
        }

        if (isEditing.value) {
            await axios.put(`${apiUrl}/auth/users/${editingUser.value.id}`, {
                username: editingUser.value.username,
                password: editingUser.value.password || undefined,
                role: editingUser.value.role,
                centro:editingUser.value.centro,
            });
            toast.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario editado correctamente', life: 3000 });
        } else {
            await axios.post(`${apiUrl}/auth/register`, {
                username: newUser.value.username,
                password: newUser.value.password,
                role: newUser.value.role,
                centro:current.centro
            });
            toast.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado correctamente', life: 3000 });
        }

        await getUsers();
        closeModal();
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar. Verifica los datos.', life: 3000 });
    }
};

const deleteUser = async () => {
    if (!userToDelete.value) return;

    try {
        await axios.delete(`${apiUrl}/auth/users/${userToDelete.value.id}`);
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado correctamente', life: 3000 });
        await getUsers();
        closeDeleteModal();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar usuario', life: 3000 });
    }
};
const getCentroNombre = (centroId: number) => {
    const centro = centros.value.find(c => c.value === centroId);
    return centro ? centro.label : 'Desconocido';
};

onMounted(() => {
  getUsers();
});
</script>


<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    width: fit-content;

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
  }
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.username-password-container {
  display: flex;
  gap: 1.5rem;
}

.inputs input,
.inputs select,
.inputs .p-password {
  width: 100%;
}
.error-message {
  color: rgb(215, 125, 125); 
  font-size: 12px;
  margin-top: 5px;
}
</style>
