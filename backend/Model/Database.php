<?php
class Database
{
    // Holds the database connection
    protected $connection = null;

    //Constructor that creates a new database connection.
    public function __construct()
    {
        try {
            // Attempt to establish a connection using the provided credentials
            $this->connection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);
            
            if (mysqli_connect_errno()) {
                throw new Exception("Could not connect to database.");   
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());   
        }           
    }

    //Executes a SELECT query and returns the result set.
    public function select($query = "", $types = '', $params = [])
    {
        try {
            // Prepare and execute the statement
            $stmt = $this->executeStatement($query, $types, $params);
            // Retrieve the results as an associative array
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);                
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return false;
    }

    //Prepares and executes a statement with the provided query and parameters.
    private function executeStatement($query = "", $types = '', $params = [])
    {
        try {
            $stmt = $this->connection->prepare($query);
            if ($stmt === false) {
                throw new Exception("Unable to do prepared statement: " . $query);
            }

            // If there are parameters, bind them to the statement
            if ($types && $params) {
                // Create an array to hold the reference of the parameters
                $bind_names[] = $types;
                for ($i = 0; $i < count($params); $i++) {
                    // Dynamically create variable names for binding
                    $bind_name = 'bind' . $i;
                    $$bind_name = $params[$i];
                    // Append a reference to the variable to the array
                    $bind_names[] = &$$bind_name;
                }
                // Call 'bind_param' with the dynamic parameters array
                call_user_func_array(array($stmt, 'bind_param'), $bind_names);
            }

            // Execute the statement
            $stmt->execute();
            return $stmt;
        } catch (Exception $e) {
            // If an error occurs, throw an exception
            throw new Exception($e->getMessage());
        }   
    }
}
