create
or replace function weight_lifted_this_month(user_uuid uuid, month_start date) returns numeric language sql as $$
select
    coalesce(sum(session_weight_lifted), 0)
from
    sessions
where
    user_id = user_uuid
    and session_start_date >= month_start;

$$;