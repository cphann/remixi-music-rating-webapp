<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class RatingModel extends Database
{
    public function getRatings($limit)
    {
        return $this->select("SELECT * FROM ratings ORDER BY id ASC LIMIT ?", ["i", $limit]);
    }
}