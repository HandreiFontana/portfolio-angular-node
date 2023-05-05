import { countriesFields } from './fields/pt/common/countries'
import { statesFields } from './fields/pt/common/states'
import { citiesFields } from './fields/pt/common/cities'
import { customersFields } from './fields/pt/operation/customers'
import { placesFields } from './fields/pt/operation/places'

export const generalPt = {
  list: {
    new: "Novo",
    edit: "Editar",
    copy: "Copiar",
    view: "Visualizar",
    delete: "Excluir",
    refresh: "Atualizar",
    search: "Pesquisar",
    otherActions: "Outras ações",
    loadingData: "Carregando dados",
    noData: "Sem dados",
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
    save: "Salvar",
    saveAndNew: "Salvar e novo",
    cancel: "Cancelar",
    return: "Voltar",
    saveSuccess: "Registro salvo com sucesso!",
    formError: "Formulário precisa ser preenchido corretamente."
  },
  menu: {
    home: 'Início',
    profile: 'Perfil',
    signOut: 'Sair',
    'Segurança': 'Segurança',
    'Motivos de Bloqueio': 'Motivos de Bloqueio',
    'Grupos de Usuários': 'Grupos de Usuários',
    'Usuários': 'Usuários',
    'Módulos': 'Módulos',
    'Opções de Menu': 'Opções de Menu',
    'Perfis': 'Perfis',
    'Usuários x Perfis': 'Usuários x Perfis',
    'Navegação': 'Navegação',
    'Common': 'Comum',
    'Countries': 'Países',
    'States': 'Estados',
    'Cities': 'Cidades',
    'Operation': 'Operação',
    'Customers': 'Clientes',
    'Places': 'Lugares',
  },
  security_blockReason: {
    title: 'Motivos de Bloqueio',
    fields: {
      id: '',
      code: 'Código',
      description: 'Descrição',
      instructionsToSolve: 'Instruções de Solução',
      isSolvedByPasswordReset: 'Resolve com reset de senha',
      disabled: 'Inativo'
    }
  },
  security_userGroup: {
    title: 'Grupos de Usuário',
    fields: {
      id: '',
      name: 'Nome',
      disabled: 'Inativo'
    }
  },
  security_user: {
    title: 'Usuários',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuário',
      userGroupId: 'Grupo de Usuário',
      name: 'Nome',
      login: 'E-Mail',
      password: 'Senha',
      disabled: 'Inativo',
      mustChangePasswordNextLogon: 'Deve trocar a senha no próximo logon',
      mustActiveTwoFactorAuthentication: 'Deve ativar a autenticação de dois fatores',
      isBlocked: 'Bloqueado',
      blockReasonId: 'Motivo de bloqueio',
      disableTwoFactorAuthentication: 'Desabilitar a autenticação de dois fatores',
      isAdmin: 'Admin',
      isSuperUser: 'Super Usuário',
      general: 'Geral',
      security: 'Segurança',
      twoFactorAuthentication: 'Autenticação de Dois Fatores',
      properties: 'Propiedades'
    }
  },
  security_module: {
    title: 'Módulos',
    fields: {
      id: '',
      name: 'Nome',
      disabled: 'Inativo'
    }
  },
  security_menuOption: {
    title: 'Opções de Menu',
    fields: {
      id: '',
      moduleName: 'Módulo',
      moduleId: 'Módulo',
      sequence: 'Sequência',
      label: 'Título',
      route: 'Rota',
      icon: 'Ícone',
      key: 'Key',
      disabled: 'Desativado'
    }
  },
  security_profile: {
    title: 'Perfis',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuário',
      name: 'Nome',
      disabled: 'Inativo',
      module: 'Módulo',
      menuOption: 'Opção de Menu',
      all: 'Todos',
      create: 'Incluir',
      view: 'Visualizar',
      update: 'Editar',
      remove: 'Deletar',
    }
  },
  security_userProfile: {
    title: 'Usuário x Perfil',
    fields: {
      id: '',
      userName: 'Usuário',
      userId: 'Usuário',
      profileName: 'Perfil',
      profileId: 'Perfil',
    }
  },
  security_navigation: {
    title: 'Navegação',
    fields: {
      id: '',
      userName: 'Usuário',
      userId: 'Usuário',
      navigationDate: 'Data',
      route: 'Rota',
    }
  },
  common_country: {
    title: 'Países',
    fields: countriesFields
  },
  common_state: {
    title: 'Estados',
    fields: statesFields
  },
  common_city: {
    title: 'Cidades',
    fields: citiesFields
  },
  operation_customer: {
    title: 'Clientes',
    fields: customersFields
  },
  operation_place: {
    title: 'Lugares',
    fields: placesFields
  },
}
