# Generated by Django 4.2.4 on 2023-09-21 00:24

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="TipoEvento",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nome", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Evento",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nome", models.CharField(max_length=255)),
                ("data", models.DateField()),
                ("cep", models.CharField(max_length=8)),
                ("rua", models.CharField(max_length=255, null=True)),
                ("numero", models.IntegerField(null=True)),
                ("bairro", models.CharField(max_length=255, null=True)),
                ("cidade", models.CharField(default="Pato Branco", max_length=255)),
                (
                    "publico_alvo",
                    models.CharField(default="Todos os publicos", max_length=255),
                ),
                (
                    "valor_entrada",
                    models.DecimalField(
                        blank=True,
                        decimal_places=2,
                        default=0,
                        max_digits=10,
                        null=True,
                    ),
                ),
                ("descricao", models.TextField(blank=True, default="", null=True)),
                (
                    "banner",
                    models.ImageField(
                        blank=True,
                        default="images/eventos/default_image.jpg",
                        null=True,
                        upload_to="images/eventos",
                    ),
                ),
                ("data_adicao", models.DateTimeField(auto_now_add=True)),
                ("tipos_evento", models.ManyToManyField(to="eventos.tipoevento")),
            ],
        ),
    ]
