import { countriesFields } from './fields/en/common/countries'
import { statesFields } from './fields/en/common/states'
import { citiesFields } from './fields/en/common/cities'
import { customersFields } from './fields/en/operation/customers'
import { placesFields } from './fields/en/operation/places'

export const generalEn = {
  list: {
    new: "New",
    edit: "Edit",
    copy: "Copy",
    view: "View",
    delete: "Delete",
    refresh: "Refresh",
    search: "Search",
    otherActions: "Other actions",
    loadingData: "Loading data",
    noData: "No data",
    confirmExcludeTitle: "Confirmar exclusão",
    confirmExcludeMessage: "Tem certeza de que deseja excluir esse registro? Você não poderá desfazer essa ação.",
    confirmMultiExcludeTitle: "Confirmar exclusão em lote",
    confirmMultiExcludeMessage: "Tem certeza de que deseja excluir todos esses registros? Você não poderá desfazer essa ação.",
    excludeSuccess: "Item excluído com sucesso.",
    multiExcludeSuccess: "Itens excluídos com sucesso.",
  },
  edit: {
    save: "Save",
    saveAndNew: "Save and new",
    cancel: "Cancel",
    return: "Return",
    saveSuccess: "Register saved successfully!",
    formError: "Form incorrect."
  },
  menu: {
    home: 'Home',
    profile: 'Profile',
    signOut: 'Sign out',
    'Segurança': 'Security',
    'Motivos de Bloqueio': 'Block Reasons',
    'Grupos de Usuários': 'Users Group',
    'Usuários': 'Users',
    'Módulos': 'Modules',
    'Opções de Menu': 'Menu Options',
    'Perfis': 'Profiles',
    'Usuários x Perfis': 'Users x Profiles',
    'Navegação': 'Navigation',
    'Common': 'Common',
    'Countries': 'Countries',
    'States': 'States',
    'Cities': 'Cities',
    'Operation': 'Operation',
    'Customers': 'Customers',
    'Places': 'Places',
  },
  security_blockReason: {
    title: 'Block Reasons',
    fields: {
      id: '',
      code: 'Code',
      description: 'Description',
      instructionsToSolve: 'Instructions to Solve',
      isSolvedByPasswordReset: 'Is solved by password reset',
      disabled: 'Disabled'
    }
  },
  security_userGroup: {
    title: 'User Groups',
    fields: {
      id: '',
      name: 'Name',
      disabled: 'Disabled'
    }
  },
  security_user: {
    title: 'Users',
    fields: {
      id: '',
      userGroupName: 'User Group',
      userGroupId: 'User Group',
      name: 'Name',
      login: 'E-Mail',
      password: 'Password',
      disabled: 'Disabled',
      mustChangePasswordNextLogon: 'Must change password next logon',
      mustActiveTwoFactorAuthentication: 'Must active two factor authentication',
      isBlocked: 'Blocked',
      blockReasonId: 'Blocked Reason',
      disableTwoFactorAuthentication: 'Disable Two Factor Authentication',
      isAdmin: 'Admin',
      isSuperUser: 'Super User',
      general: 'General',
      security: 'Security',
      twoFactorAuthentication: 'Two Factor Authentication',
      properties: 'Properties'
    }
  },
  security_module: {
    title: 'Modules',
    fields: {
      id: '',
      name: 'Name',
      disabled: 'Disabled'
    }
  },
  security_menuOption: {
    title: 'Menu Options',
    fields: {
      id: '',
      moduleName: 'Module',
      moduleId: 'Module',
      sequence: 'Sequence',
      label: 'Label',
      route: 'Route',
      icon: 'Icon',
      key: 'Key',
      disabled: 'Disabled'
    }
  },
  security_profile: {
    title: 'Profiles',
    fields: {
      id: '',
      userGroupName: 'User Group',
      name: 'Name',
      disabled: 'Disabled',
      module: 'Module',
      menuOption: 'Menu Option',
      all: 'All',
      create: 'Create',
      view: 'View',
      update: 'Update',
      remove: 'Delete',
    }
  },
  security_userProfile: {
    title: 'User x Profile',
    fields: {
      id: '',
      userName: 'User',
      userId: 'User',
      profileName: 'Profile',
      profileId: 'Profile',
    }
  },
  security_navigation: {
    title: 'Navigation',
    fields: {
      id: '',
      userName: 'User',
      userId: 'User',
      navigationDate: 'Date',
      route: 'Route',
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
