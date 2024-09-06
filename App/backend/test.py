from Satellite_Image_Collector import *


def test_get_geometry():
    """
    Testing get_geometry function from Satellite_Image_Collector.py
    """
    data = {
        'province': 'Lâm Đồng',
        'district': 'Đà Lạt',
        'ward': '1'
    }

    ward_data = get_geometry(province=data['province'], district=data['district'], ward=data['ward'])
    print(ward_data)
    print(type(ward_data))
    assert isinstance(ward_data, BaseGeometry), "Output should be shapely geometry"
    assert isinstance(ward_data.centroid, Point), "Output should be a point"

test_get_geometry()