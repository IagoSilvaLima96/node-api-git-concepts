create table ride (
    ride_id uuid primary key,
    passenger_id uuid,
    driver_id uuid,
    from_lat numeric,
    from_long numeric,
    to_lat numeric,
    to_long numeric,
    status text,
    request_date timestamp,
    accept_date timestamp,
    start_date timestamp,
    end_date timestamp,
    price numeric
)


create table users (
    user_id uuid primary key,
    email text,
    password text,
    password_type text,
    salt text
)