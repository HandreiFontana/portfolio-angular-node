import { countriesFields } from './fields/es/common/countries'
import { statesFields } from './fields/es/common/states'
import { citiesFields } from './fields/es/common/cities'
import { customersFields } from './fields/es/operation/customers'
import { placesFields } from './fields/es/operation/places'

export const generalEs = {
  list: {
    new: "Nuevo",
    edit: "Editar",
    copy: "Copiar",
    view: "Visualizar",
    delete: "Borrar",
    refresh: "Actualizar",
    search: "Buscar",
    otherActions: "Otras acciones",
    loadingData: "Cargando datos",
    noData: "Sin datos",
    confirmExcludeTitle: "Confirmar exclusão",
    confirmExcludeMessage: "Tem certeza de que deseja excluir esse registro? Você não poderá desfazer essa ação.",
    confirmMultiExcludeTitle: "Confirmar exclusão em lote",
    confirmMultiExcludeMessage: "Tem certeza de que deseja excluir todos esses registros? Você não poderá desfazer essa ação.",
    excludeSuccess: "Item excluído com sucesso.",
    multiExcludeSuccess: "Itens excluídos com sucesso.",
    advancedFilterApplied: "Filtro customizado",
    filterCloseModal: "Fechar",
    filterApplyModal: "Filtrar",
    filterField: "Campo",
    filterOperator: "Operador",
    filterValue: "Valor",
    filterOr: "OU",
    filterAnd: "E",
    filterClear: "Limpar",
    filterAdd: "Adicionar",
    filterExpression: "Expressão",
    filterSavedFilters: "Filtros Salvos",
    filterExcludeSavedFilter: "Excluir",
    filterSaveFilterName: "Nome",
    filterSaveNew: "Salvar novo",
    filterApply: "Aplicar"
  },
  edit: {
    save: "Save",
    saveAndNew: "Save and new",
    cancel: "Cancel",
    return: "Volver",
    saveSuccess: "Registro guardado con éxito!",
    formError: "Campos incorrectos."
  },
  menu: {
    home: 'Home',
    profile: 'Perfil',
    signOut: 'Salir',
    'Segurança': 'Seguridad',
    'Motivos de Bloqueio': 'Razones de Bloqueo',
    'Grupos de Usuários': 'Grupo de Usuario',
    'Usuários': 'Usuarios',
    'Módulos': 'Módulos',
    'Opções de Menu': 'Opciones de Menú',
    'Perfis': 'Perfiles',
    'Usuários x Perfis': 'Usuarios x Perfiles',
    'Navegação': 'Navegación',
  },
  security_blockReason: {
    title: 'Razones de Bloqueo',
    fields: {
      id: '',
      code: 'Código',
      description: 'Descripción',
      instructionsToSolve: 'Instrucciones de Solución',
      isSolvedByPasswordReset: 'Soluciona restableciendo la contraseña',
      disabled: 'Desactivado'
    }
  },
  security_userGroup: {
    title: 'Grupos de Usuario',
    fields: {
      id: '',
      name: 'Nombre',
      disabled: 'Desactivado'
    }
  },
  security_user: {
    title: 'Usuarios',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuario',
      userGroupId: 'Grupo de Usuario',
      name: 'Nombre',
      login: 'E-Mail',
      password: 'Contraseña',
      disabled: 'Inactivo',
      mustChangePasswordNextLogon: 'Debe cambiar la contraseña el próximo inicio de sesión',
      mustActiveTwoFactorAuthentication: 'Debe activar la autenticación de dos factores',
      isBlocked: 'Bloqueado',
      blockReasonId: 'Motivo de bloqueo',
      disableTwoFactorAuthentication: 'Deshabilitar la autenticación de dos factores',
      isAdmin: 'Admin',
      isSuperUser: 'Super Usuario',
      general: 'General',
      security: 'Seguridad',
      twoFactorAuthentication: 'Autenticación de Dos Factores',
      properties: 'Propiedades'
    }
  },
  security_module: {
    title: 'Módulos',
    fields: {
      id: '',
      name: 'Nombre',
      disabled: 'Desactivado'
    }
  },
  security_menuOption: {
    title: 'Opciones de Menú',
    fields: {
      id: '',
      moduleName: 'Módulo',
      moduleId: 'Módulo',
      sequence: 'Secuencia',
      label: 'Etiqueta',
      route: 'Ruta',
      icon: 'Icono',
      key: 'Key',
      disabled: 'Desactivado'
    }
  },
  security_profile: {
    title: 'Perfiles',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuario',
      name: 'Nombre',
      disabled: 'Desactivado',
      module: 'Módulo',
      menuOption: 'Opción de Menú',
      all: 'Todo',
      create: 'Crear',
      view: 'Vista',
      update: 'Actualizar',
      remove: 'Eliminar',
    }
  },
  security_userProfile: {
    title: 'Usuario x Perfil',
    fields: {
      id: '',
      userName: 'Usuario',
      userId: 'Usuario',
      profileName: 'Perfil',
      profileId: 'Perfil',
    }
  },
  security_navigation: {
    title: 'Navegación',
    fields: {
      id: '',
      userName: 'Usuario',
      userId: 'Usuario',
      navigationDate: 'Fecha',
      route: 'Ruta',
    }
  },
  common_country: {
    title: 'Countries',
    fields: countriesFields
  },
  common_state: {
    title: 'States',
    fields: statesFields
  },
  common_city: {
    title: 'Cities',
    fields: citiesFields
  },
  operation_customer: {
    title: 'Customers',
    fields: customersFields
  },
  operation_place: {
    title: 'Places',
    fields: placesFields
  },
 }
