<?php

namespace app\models;

/**
 * This is the model class for table "todo_list".
 *
 * @property int $id
 * @property string $description
 * @property int|null $status
 */
class TodoList extends \yii\db\ActiveRecord
{

    const IN_PROGRESS = 0;
    const READY = 1;

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'todo_list';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['description'], 'required'],
            [['status'], 'integer'],
            [['description'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'description' => 'Description',
            'status' => 'Status',
        ];
    }
}
