"""updated User

Revision ID: 652f50865346
Revises: 9d1f6c85ed62
Create Date: 2024-09-17 20:15:40.494612

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '652f50865346'
down_revision = '9d1f6c85ed62'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), nullable=False))

    # ### end Alembic commands ###
