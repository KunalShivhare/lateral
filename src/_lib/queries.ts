import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetDebtCases(
    $filters: [rdebt_cases_bool_exp!] = {}, 
    $offset: Int = 0, 
    $limit: Int = 10
  ) {
    rdebt_cases(
      where: { _and: $filters }, 
      order_by: { date: desc },
      offset: $offset,
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