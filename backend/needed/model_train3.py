import tensorflow as tf
from tensorflow.keras import layers, models
import os

# ==== CONFIG ====
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 5
MODEL_PATH = "backend/needed/color_model.h5"
TRAIN_DIR = "backend/needed/data/images/train"  # 50 folders
VAL_SPLIT = 0.2  # 20% for validation

# ==== LOAD DATA ====
full_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    TRAIN_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int",
    shuffle=True
)

# Save class names before mapping
class_names = full_dataset.class_names
print("Classes detected:", class_names)
num_classes = len(class_names)

# Split into train/validation
dataset_size = len(full_dataset)
val_size = int(dataset_size * VAL_SPLIT)
train_ds = full_dataset.skip(val_size)
val_ds = full_dataset.take(val_size)

# Normalize pixel values
normalization_layer = layers.Rescaling(1./255)
train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
val_ds = val_ds.map(lambda x, y: (normalization_layer(x), y))

# Prefetch for performance
train_ds = train_ds.prefetch(tf.data.AUTOTUNE)
val_ds = val_ds.prefetch(tf.data.AUTOTUNE)

# ==== BUILD MODEL ====
model = models.Sequential([
    layers.Input(shape=IMG_SIZE + (3,)),
    layers.Conv2D(32, (3,3), activation="relu"),
    layers.MaxPooling2D(),
    layers.Conv2D(64, (3,3), activation="relu"),
    layers.MaxPooling2D(),
    layers.Conv2D(128, (3,3), activation="relu"),
    layers.GlobalAveragePooling2D(),
    layers.Dense(num_classes, activation="softmax")
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# ==== TRAIN ====
model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS
)

# ==== SAVE MODEL ====
model.save(MODEL_PATH)
print(f"✅ Model saved to {MODEL_PATH}")
