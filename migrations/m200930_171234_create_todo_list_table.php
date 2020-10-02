<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%todo_list}}`.
 */
class m200930_171234_create_todo_list_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%todo_list}}', [
            'id' => $this->primaryKey(),
            'description' => $this->string()->notNull(),
            'status' => $this->boolean()->defaultValue(false)
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%todo_list}}');
    }
}
