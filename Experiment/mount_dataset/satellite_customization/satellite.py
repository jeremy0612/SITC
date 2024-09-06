# Copyright (c) OpenMMLab. All rights reserved.
import mmengine.fileio as fileio

from mmseg.registry import DATASETS
from .basesegdataset import BaseSegDataset


@DATASETS.register_module()
class SatelliteDataset(BaseSegDataset):
    """Satellite dataset.
    """
    METAINFO = dict(
        classes=('building', 'road', 'water', 'barren', 'forest', 'agriculture', 'background'),
        palette=[[120, 120, 120], [6, 230, 230], [0, 0, 255], [128, 0, 0], [0, 128, 0], [255, 255, 0], [0, 0, 0]])


    def __init__(self,
                 img_suffix='.png',
                 seg_map_suffix='.png',
                 reduce_zero_label=False,
                 **kwargs) -> None:
        super().__init__(
            img_suffix=img_suffix,
            seg_map_suffix=seg_map_suffix,
            reduce_zero_label=reduce_zero_label,
            **kwargs)
        assert fileio.exists(
            self.data_prefix['img_path'], backend_args=self.backend_args)
