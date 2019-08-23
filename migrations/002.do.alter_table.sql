CREATE TYPE expense_category AS ENUM(  
    'Transportation',
    'Bills',
    'Personal',
    'Entertainment',
    'Food',
    'Travel'
);

ALTER TABLE expense_logs 
    ADD COLUMN 
        style expense_category