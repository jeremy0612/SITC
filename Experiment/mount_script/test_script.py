# ===========  Test script for MMSegInferencer ==============
# from mmseg.apis import MMSegInferencer
# # Load models into memory
# inferencer = MMSegInferencer(model='deeplabv3plus_r18-d8_4xb2-80k_cityscapes-512x1024')
# # Inference
# inferencer('../demo/demo.png', show=True)
# ===========  Test script for MMSegInferencer 2 ==============
# from mmseg.datasets import CityscapesDataset
# from mmengine.registry import init_default_scope
# init_default_scope('mmseg')

# data_root = '/mmsegmentation/data/STARE/'
# data_prefix=dict(img_path='images/training', seg_map_path='annotations/training')
# train_pipeline = [
#     dict(type='LoadImageFromFile'),
#     dict(type='LoadAnnotations'),
#     dict(type='RandomCrop', crop_size=(512, 1024), cat_max_ratio=0.75),
#     dict(type='RandomFlip', prob=0.5),
#     dict(type='PackSegInputs')
# ]

# dataset = CityscapesDataset(data_root=data_root, data_prefix=data_prefix, test_mode=False, pipeline=train_pipeline)
