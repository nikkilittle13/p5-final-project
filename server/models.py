from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, metadata

recipe_categories = db.Table(
  'recipe_categories',
  metadata,
  db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.id'), primary_key=True),
  db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
)

class Recipe(db.Model, SerializerMixin):
  __tablename__ = 'recipes'
   
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  ingredients = db.Column(db.String, nullable=False)
  instructions = db.Column(db.String, nullable=False)
  image = db.Column(db.String)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   
  creator = db.relationship('User', back_populates='recipes')
  categories = db.relationship('Category', secondary='recipe_categories', back_populates='recipes')
  comments = db.relationship('Comment', back_populates='recipe', cascade='all, delete-orphan')

  serialize_rules = ('-creator.recipes', '-categories.recipes', '-comments.recipe', '-comments.user.recipes', '-creator.comments')

  @validates('title')
  def validate_title(self, key, title):
    if not title or len(title) < 3:
      raise ValueError("Title must be at least 3 characters long.")
    return title
  
  @validates('ingredients')
  def validate_ingredients(self, key, ingredients):
    if not ingredients or len(ingredients) < 25:
      raise ValueError("Ingredients must be at least 25 characters long.")
    return ingredients
  
  @validates('instructions')
  def validate_instructions(self, key, instructions):
    if not instructions or len(instructions) < 25:
      raise ValueError("Instructions must be at least 25 characters long.")
    return instructions

class Category(db.Model, SerializerMixin):
  __tablename__ = 'categories'
   
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), unique=True, nullable=False)
   
  recipes = db.relationship('Recipe', secondary='recipe_categories', back_populates='categories')

  serialize_rules = ('-recipes.categories', '-recipes.comments', '-recipes.creator')

  @validates('name')
  def validate_name(self, key, name):
    if not name:
      raise ValueError("Category name cannot be empty.")
    return name

class User(db.Model, SerializerMixin):
  __tablename__ = 'users'
    
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, unique=True, nullable=False)
    
  recipes = db.relationship('Recipe', back_populates='creator', cascade='all, delete-orphan')
  comments = db.relationship('Comment', back_populates='user')

  serialize_rules = ('-recipes.creator', '-recipes.comments', '-comments.recipe', '-comments.user', '-recipes.categories')

  @validates('username')
  def validate_username(self, key, username):
    if not username or len(username) < 5:
      raise ValueError("Username must be at least 5 characters long.")
    return username

class Comment(db.Model, SerializerMixin):
  __tablename__ = 'comments'
   
  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String, nullable=False)
  recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   
  recipe = db.relationship('Recipe', back_populates='comments')
  user = db.relationship('User', back_populates='comments')

  serialize_rules = ('-recipe', '-user')

  @validates('content')
  def validate_content(self, key, content):
    if not content:
      raise ValueError("Comment cannot be empty.")
    return content