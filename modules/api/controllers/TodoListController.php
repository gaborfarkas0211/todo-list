<?php

namespace app\modules\api\controllers;

use app\models\TodoList;
use Yii;
use yii\rest\Controller;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;

class TodoListController extends Controller
{
    /**
     * @return array
     */
    public function verbs()
    {
        $verbs = parent::verbs();
        $verbs["index"] = ['GET'];
        $verbs["create"] = ['POST'];
        $verbs["update"] = ['POST'];
        $verbs["delete"] = ['DELETE'];
        return $verbs;
    }

    /**
     * {@inheritdoc}
     */
    public function actionIndex()
    {
        $lists = TodoList::find()->all();
        if (empty($lists)) {
            return [];
        }
        return $lists;
    }

    /**
     * {@inheritdoc}
     */
    public function actionCreate()
    {
        $list = new TodoList();
        if ($list->load(Yii::$app->request->post())) {
            if ($list->save()) {
                $list->status = false;
                return $list;
            }
        }
        throw new BadRequestHttpException();
    }

    /**
     * {@inheritdoc}
     */
    public function actionUpdate($id)
    {
        $list = TodoList::find()->where(['id' => $id])->one();
        if ($list) {
            $list->status = TodoList::READY;
            return $list->save();
        }
        throw new NotFoundHttpException();
    }

    /**
     * {@inheritdoc}
     */
    public function actionDelete(int $id)
    {
        $list = TodoList::find()->where(['id' => $id])->one();
        if ($list) {
            return $list->delete();
        }
        throw new NotFoundHttpException();
    }
}
