<template>
  <Menu :model="computedMenuItems" :dt="menubarStyle">
    <template #start>
      <img src="../../assets/logo.png" alt="Logo" class="logo" />
    </template>
    <template #end>
      <Divider />
      <div class="user-info">
        <Avatar label="AS" size="large" shape="circle" />
        <p class="text-white">Alison Salas</p>
      </div>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import type { MenuItem } from 'primevue/menuitem';
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Divider } from 'primevue';

const router = useRouter();
const route = useRoute();

const menuItems = ref<MenuItem[]>([
  {
    label: 'Centros Medicos',
    icon: 'pi pi-fw pi-building',
    command: () => router.push({ name: 'centros_medicos' }),
    routeName: 'centros_medicos',
  },
  {
    label: 'Medicos',
    icon: 'fas fa-user-doctor',
    command: () => router.push({ name: 'medicos' }),
    routeName: 'medicos',
  },
  {
    label: 'Especialidades',
    icon: 'pi pi-fw pi-book',
    command: () => router.push({ name: 'especialidades' }),
    routeName: 'especialidades',
  },
  {
    label: 'Empleados',
    icon: 'pi pi-fw pi-users',
    command: () => router.push({ name: 'empleados' }),
    routeName: 'empleados',
  },
  {
    label: 'Pacientes',
    icon: 'pi pi-fw pi-user-plus',
    command: () => router.push({ name: 'pacientes' }),
    routeName: 'pacientes',
  },
  {
    label: 'Consultas Medicas',
    icon: 'pi pi-fw pi-calendar',
    command: () => router.push({ name: 'consultas_medicas' }),
    routeName: 'consultas_medicas',
  },
]);

const computedMenuItems = computed(() =>
  menuItems.value.map((item) => ({
    ...item,
    class: item.routeName === route.name ? 'active-menu-item' : '',
  })),
);

const menubarStyle = ref({
  root: {
    background: 'var(--primary-600)',
    borderColor: 'transparent',
    borderRadius: '0',
    list: {
      padding: '0 20px',
      focus: 'var(--primary-800)',
    },
    item: {
      iconColor: '#fff',
      color: '#fff',
    },
    mobile: {
      buttonColor: '#fff',
    },
  },
});
</script>

<style lang="scss">
.p-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
  min-width: fit-content !important;

  .p-menu-start {
    display: flex;
    justify-content: center;
    margin: 2rem 0 0 0;
    padding: 0 2rem;

    img {
      width: 120px;
      height: auto;
    }
  }

  .p-menu-list {
    margin: 1rem 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;

    .p-focus {
      background-color: var(--primary-400) !important;
      border-radius: 4px;

      .p-menu-item-content {
        background-color: var(--primary-400) !important;
      }
    }

    .p-menu-item-content:hover {
      background-color: var(--primary-400) !important;

      .p-menu-item-icon {
        color: #fff !important;
      }
    }

    .p-menu-item-content {
      border-radius: 0;
    }

    .p-menu-item-link {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      padding: 1.3rem 1.2rem;

      .p-menu-item-icon {
        font-size: 17px;
        color: #fff;
      }
      .p-menu-item-label {
        font-size: 17px;
        color: #fff;
        white-space: nowrap;
      }
    }

    .active-menu-item {
      background-color: var(--primary-400) !important;
      border-radius: 4px;

      .p-menu-item-content {
        background-color: var(--primary-400) !important;
      }

      .p-menu-item-icon,
      .p-menu-item-label {
        color: #fff !important;
      }
    }
  }

  .p-menu-end {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0 2rem;

    .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #fff;
      gap: 1rem;
    }
  }
}
</style>
