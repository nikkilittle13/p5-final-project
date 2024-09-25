#!/usr/bin/env python3

from flask import request, make_response, jsonify
from flask_restful import Resource
from sqlalchemy import func

from config import app, db, api

from models import User, Recipe, Category, Comment, recipe_categories

class Users(Resource):
    def get(self):
        try:
            users = [user.to_dict() for user in User.query.all()]
            return make_response(users, 200)
        
        except Exception as e:
            return make_response({"error": str(e)}, 500)
    
api.add_resource(Users, '/users')

class Recipes(Resource):
    def get(self):
        try:
            recipes = [recipe.to_dict() for recipe in Recipe.query.all()]
            return make_response(recipes, 200)
        
        except Exception as e:
            return make_response({"error": str(e)}, 500)
    
    def post(self):
        data = request.json

        title = data['title']
        ingredients = data['ingredients']
        instructions = data['instructions']
        category_ids = data['categoryIds']
        image = data['image']
        user_id = data['user_id']
        

        categories = Category.query.filter(Category.id.in_(category_ids)).all()
        if len(categories) != len(category_ids):
            return jsonify({"error": "One or more categories not found"}), 404

        new_recipe = Recipe(
            title=title,
            ingredients=ingredients,
            instructions=instructions,
            user_id=user_id,
            categories=categories,
            image=image
        )

        try:
            db.session.add(new_recipe)
            db.session.commit()
            return make_response(new_recipe.to_dict(), 200)
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

    
api.add_resource(Recipes, '/recipes')
    
class RecipeByID(Resource):
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).first()

        if not recipe:
            return make_response({'message': 'Recipe not found'}, 404)

        return make_response(recipe.to_dict(), 200)
    
    def patch(self, id):
        recipe = Recipe.query.filter_by(id=id).first()

        if not recipe:
            return make_response({'message': 'Recipe not found'}, 404)
        
        data = request.get_json()

        if 'title' in data:
            recipe.title = data['title']
        
        if 'ingredients' in data:
            recipe.ingredients = data['ingredients']
        
        if 'instructions' in data:
            recipe.instructions = data['instructions']

        if 'user_id' in data:
            recipe.user_id = data['user_id']

        if 'image' in data:
            recipe.image = data['image']

        if 'categories' in data:
            recipe.categories.clear()

            categories = data['categories']
            for category_id in categories:
                category = Category.query.filter_by(id=category_id).first()
                if category:
                    recipe.categories.append(category)

        try:
            db.session.commit()
            return make_response(recipe.to_dict(), 200)
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}, 400)
        
    def delete(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return make_response({'message': 'Recipe not found'}, 404)
        
        db.session.delete(recipe)
        db.session.commit()

        try:
            return ({'message': 'Recipe deleted successfully'}, 200)
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}, 500)
    
api.add_resource(RecipeByID, '/recipes/<int:id>')

class TrendingRecipes(Resource):
    def get(self):
        try:
            trending_recipes = (
                db.session.query(Recipe)
                .outerjoin(Comment)
                .group_by(Recipe.id)
                .order_by(func.count(Comment.id).desc())
                .limit(4)
                .all()
            )

            return make_response([recipe.to_dict() for recipe in trending_recipes], 200)
        
        except Exception as e:
            return make_response({"error": str(e)}, 500)
    
api.add_resource(TrendingRecipes, '/recipes/trending')

class Categories(Resource):
    def get(self):
        try:
            categories = [category.to_dict() for category in Category.query.all()]
            return make_response(categories, 200)
        
        except Exception as e:
            return make_response({"error": str(e)}, 500)
    
api.add_resource(Categories, '/categories')

class Comments(Resource):
    def get(self):
        try:
            comments = [comment.to_dict() for comment in Comment.query.all()]
            return make_response(comments, 200)
        
        except Exception as e:
            return make_response({"error": str(e)}, 500)
    
    def post(self):
        data = request.get_json()

        content = data['content']
        recipe_id = data['recipe_id']
        user_id = data['user_id']

        new_comment = Comment(
            content=content,
            recipe_id=recipe_id,
            user_id=user_id
        )

        try:
            db.session.add(new_comment)
            db.session.commit()
            return make_response(new_comment.to_dict(), 200)
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}, 400)
    
api.add_resource(Comments, '/comments')

class CommentByID(Resource):
    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()

        if not comment:
            return make_response({'message': 'Comment not found'}, 404)

        return make_response(comment.to_dict(), 200)
    
    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()

        if not comment:
            return make_response({'message': 'Comment not found'}, 404)
        
        try:
            db.session.delete(comment)
            db.session.commit()
            return ({'message': 'Comment deleted successfully'}, 200)
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}, 500)
    
api.add_resource(CommentByID, '/comments/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)