import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection()


  // block reasons

  await connection.query(
    `INSERT INTO block_reasons (
      id,
      code,
      description,
      instructions_to_solve,
      is_solved_by_password_reset,
      created_at,
      updated_at
    ) values 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '001', 'Conta bloqueada por excesso de tentativas de acesso.', 'Use a opção de reset de senha.', true, 'now()', 'now()')`
  )


  // user groups

  await connection.query(
    `INSERT INTO user_groups (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', 'portfolio', 'now()', 'now()')`
  )


  // users

  const id = uuidV4()
  const password = await hash(btoa('admin'), 8)

  await connection.query(
    `INSERT INTO users (
      id, 
      user_group_id,
      name, 
      login, 
      password, 
      is_admin, 
      is_super_user, 
      created_at,
      updated_at
    ) values (
      '${id}', 
      'ca49908a-28cd-4573-808c-36c5f42a2e68',
      'admin', 
      'admin@handrei.com.br', 
      '${password}', 
      true, 
      true, 
      'now()', 
      'now()'
    )`
  )
  

  // modules

  await connection.query(
    `INSERT INTO modules (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('5aefe650-10a3-4e0d-a018-4704975d84b6', 'Segurança', 'now()', 'now()'),
			('a88de034-1489-4113-b527-7f7d95fc3609', 'Common', 'now()', 'now()'),
			('05fae61a-d87d-4ea6-afc6-82a168df44bb', 'Operation', 'now()', 'now()')`
  )


  // menu options

  await connection.query(
    `INSERT INTO menu_options (
      id,
      module_id,
      sequence,
      label,
      route,
      icon,
      key,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001', 'Segurança', '', 'fa-solid fa-lock', 'security', 'now()', 'now()'), 
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001001', 'Motivos de Bloqueio', '/block-reasons', 'List', 'security-block-reasons', 'now()', 'now()'), 
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001002', 'Grupos de Usuários', '/user-groups', 'List', 'security-user-groups', 'now()', 'now()'), 
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001003', 'Usuários', '/users', 'List', 'security-users', 'now()', 'now()'), 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001004', 'Módulos', '/modules', 'List', 'security-modules', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001005', 'Opções de Menu', '/menu-options', 'List', 'security-menu-options', 'now()', 'now()'), 
      ('2814da68-5179-4152-bd7e-22361b844b88', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001006', 'Perfis', '/profiles', 'List', 'security-profiles', 'now()', 'now()'), 
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001007', 'Usuários x Perfis', '/users-profiles', 'List', 'security-users-profiles', 'now()', 'now()'), 
      ('0471bddc-de4c-42d1-a778-b67086796de1', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001008', 'Navegação', '/navigations', 'List', 'security-navigations', 'now()', 'now()'),
			('b1ea252b-38cd-41b1-8af3-f3c783217dcf', 'a88de034-1489-4113-b527-7f7d95fc3609', '002', 'Common', '', 'fa-solid fa-table', 'common', 'now()', 'now()'),
			('363c5f16-0d7e-4846-a9b4-5e812499728b', 'a88de034-1489-4113-b527-7f7d95fc3609', '002001', 'Countries', '/countries', 'List', 'common-countries', 'now()', 'now()'),
			('7a6201d4-60b0-495e-9b1a-84eb7e348345', 'a88de034-1489-4113-b527-7f7d95fc3609', '002002', 'States', '/states', 'List', 'common-states', 'now()', 'now()'),
			('02bd0818-c44c-4225-824d-c19a85e5d8e4', 'a88de034-1489-4113-b527-7f7d95fc3609', '002003', 'Cities', '/cities', 'List', 'common-cities', 'now()', 'now()'),
			('cd55aa16-6bc8-43d4-a9e4-a1c090d122c8', '05fae61a-d87d-4ea6-afc6-82a168df44bb', '003', 'Operation', '', 'fa-solid fa-location-dot', 'operation', 'now()', 'now()'),
			('d8fe334f-388b-47f4-8b2f-169a976eafa6', '05fae61a-d87d-4ea6-afc6-82a168df44bb', '003001', 'Customers', '/customers', 'List', 'operation-customers', 'now()', 'now()'),
			('13898185-fc04-481f-984a-8df2bf90c0c2', '05fae61a-d87d-4ea6-afc6-82a168df44bb', '003002', 'Places', '/places', 'List', 'operation-places', 'now()', 'now()')`
  )


  // profiles

  await connection.query(
    `INSERT INTO profiles (
      id,
      user_group_id,
      name,
      created_at,
      updated_at
    ) values 
      ('3c99decf-f975-4b16-b552-0747afd397a3', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Admin', 'now()', 'now()')`
  )


  // profile options

  await connection.query(
    `INSERT INTO profile_options (
      id,
      profile_id,
      menu_option_key,
      permit_all,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '3c99decf-f975-4b16-b552-0747afd397a3', 'security', true, 'now()', 'now()'),
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-block-reasons', true, 'now()', 'now()'),
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-user-groups', true, 'now()', 'now()'),
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users', true, 'now()', 'now()'),
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-modules', true, 'now()', 'now()'),
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-menu-options', true, 'now()', 'now()'),
      ('2814da68-5179-4152-bd7e-22361b844b88', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-profiles', true, 'now()', 'now()'),
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users-profiles', true, 'now()', 'now()'),
      ('0471bddc-de4c-42d1-a778-b67086796de1', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-navigations', true, 'now()', 'now()'),
			('1a45dfb0-e26e-4505-a952-2dc20ea4e654', '3c99decf-f975-4b16-b552-0747afd397a3', 'common', true, 'now()', 'now()'),
			('676f34f0-32d1-44d3-ab1c-f29b37efcccb', '3c99decf-f975-4b16-b552-0747afd397a3', 'common-countries', true, 'now()', 'now()'),
			('7e458b35-01a9-4072-961b-78185c66522f', '3c99decf-f975-4b16-b552-0747afd397a3', 'common-states', true, 'now()', 'now()'),
			('a0a06c97-d3ad-4efa-b2bc-eadc6e87bbf2', '3c99decf-f975-4b16-b552-0747afd397a3', 'common-cities', true, 'now()', 'now()'),
			('dafbd538-fbba-4dc4-b215-2c70e7ec8407', '3c99decf-f975-4b16-b552-0747afd397a3', 'operation', true, 'now()', 'now()'),
			('4f590e35-4e44-4e3b-bbf2-4ea49d5365d0', '3c99decf-f975-4b16-b552-0747afd397a3', 'operation-customers', true, 'now()', 'now()'),
			('702f0733-2fac-42b7-ac96-d9ed117358c7', '3c99decf-f975-4b16-b552-0747afd397a3', 'operation-places', true, 'now()', 'now()')`
  )


  // user x profile

  await connection.query(
    `INSERT INTO users_profiles (
      id,
      user_id,
      profile_id,
      created_at,
      updated_at
    ) values 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '${id}', '3c99decf-f975-4b16-b552-0747afd397a3', 'now()', 'now()')`
  )

  await connection.close()
}

export async function admin() {
  await create().then(() => console.log('Admin and Security tables created!'))
}
