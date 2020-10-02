<?php

/* @var $this yii\web\View */

$this->title = 'My Yii Application';
?>
<div class="site-index">
    <div class="row">
        <div class="col-md-6 col-md-offset-3 text-center">
            <h2>My To Do List</h2>

            <form id="add-list-form">
                <div class="form-group">
                    <textarea cols="6" rows="3" maxlength="255" class="form-control" placeholder="Description..." name="TodoList[description]"></textarea>
                </div>
                <button type="submit" class="btn">Add new</button>
            </form>
        </div>
    </div>
    <hr>
    <div id="spinner" class="row">
    </div>
    <div id="todo" class="row">
    </div>
</div>