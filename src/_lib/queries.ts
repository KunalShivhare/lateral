import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetDebtCases(
    $filters: [rdebt_cases_bool_exp!] = {}
    $offset: Int = 0
    $limit: Int = 10
    $orderBy: [rdebt_cases_order_by!]
  ) {
    rdebt_cases(
      where: { _and: $filters }
      order_by: $orderBy
      offset: $offset
      limit: $limit
    ) {
      id
      date
      ref
      client_id
      scheme_id
      debtorid
      amount1
      amount2
      last_payment_date
      last_payment_amount
      offense_date
      highcourt_date
      current_stage_date
      current_stage_id
      d_outstanding
      batch_id
    }
    rdebt_cases_aggregate(where: { _and: $filters }) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_SAVED_FILTERS = gql`
  query GetSavedFilters {
    user_filters {
      id
      filter_name
      filters
    }
  }
`;

export const SAVE_FILTER = gql`
  mutation SaveFilter($filter_name: String!, $filters: jsonb!) {
    insert_user_filters_one(
      object: {
        debtorid: "12382"
        filter_name: $filter_name
        filters: $filters
        table_name: "rdebt_cases"
      }
    ) {
      id
      filter_name
    }
  }
`;

export const GET_SAVED_VIEWS = gql`
  query GetSavedViews {
    user_views {
      id
      view_name
      views
    }
  }
`;

export const SAVE_VIEW = gql`
  mutation SaveView($view_name: String!, $views: jsonb!) {
    insert_user_views_one(
      object: { user_id: "12382", view_name: $view_name, views: $views }
    ) {
      id
      view_name
    }
  }
`;

export const GET_FILTER_DEFINITIONS = gql`
  query GetFilterDefinitions {
    filter_definition(order_by: { sort_order: asc }) {
      id
      table_name
      column_name
      display_name
      filter_type
      active
    }
  }
`;

export const GET_CASE_DETAILS = gql`
  query GetCaseDetails($case_id: String!) {
    rdebt_cases(where: { id: { _eq: $case_id } }) {
      id
      date
      ref
      cl_ref
      client_id
      scheme_id
      debtorid
      amount1
      d_outstanding
      amount2
      last_payment_date
      last_payment_amount
      offense_date
      highcourt_date
      current_stage_date
      current_stage_id
      d_outstanding
      batch_id
      debtor {
        debtor_id
        debtor_name
        debtor_phone
        debtor_employer_address
        debtor_trading_as
      }
    }
  }
`;

export const GET_ADJACENT_CASES = gql`
  query GetAdjacentCases($current_id: String!, $limit: Int = 1) {
    prev_case: rdebt_cases(
      where: { id: { _lt: $current_id } }
      order_by: { id: desc }
      limit: $limit
    ) {
      id
    }
    next_case: rdebt_cases(
      where: { id: { _gt: $current_id } }
      order_by: { id: asc }
      limit: $limit
    ) {
      id
    }
  }
`;

export const GET_TABLE_SCHEMA = gql`
  query GET_TABLE_SCHEMA($tableName: String!) {
    __type(name: $tableName) {
      fields {
        name
      }
    }
  }
`;
